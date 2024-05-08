import HTMLJanitor from 'html-janitor';

const allowedInlineTags = {
  a: { href: true, target: true },
  code: {},
  strong: {},
  b: {},
  i: {},
  em: {},
};

const headingTags = {
  h1: {},
  h2: {},
  h3: {},
  h4: {},
  h5: {},
  h6: {},
};

const allAllowedTags = {
  p: {},
  ul: {},
  ol: {},
  li: {},
  figure: {},
  ...headingTags,
  ...allowedInlineTags,
};

interface IHtmlJanitor {
  clean: (str: string) => string;
}

type TTags = Record<string, Record<string, boolean>>;

class Janitor {
  #instance: IHtmlJanitor = new HTMLJanitor({ tags: allAllowedTags });
  #inlineTagsInstance: IHtmlJanitor = new HTMLJanitor({ tags: allowedInlineTags });

  #getInstance(tags: TTags): IHtmlJanitor {
    return new HTMLJanitor({ tags });
  }

  #cleanInlineTags(str: string, tags?: TTags): string {
    if (tags) {
      const newInstance = this.#getInstance({ ...allowedInlineTags, ...tags });
      return newInstance.clean(str);
    }

    return this.#inlineTagsInstance.clean(str);
  }

  #getTextContent(str: string): string {
    const newInstance = this.#getInstance({});
    return newInstance.clean(str);
  }

  clean(
    str: string,
    config?: { onlyInlineTags?: boolean; tags?: TTags; onlyText?: boolean },
  ): string {
    if (!config) return this.#instance.clean(str);

    if (config?.onlyInlineTags) return this.#cleanInlineTags(str, config.tags);

    if (config?.onlyText) return this.#getTextContent(str);

    throw new Error('Unsupported config for janitor');
  }
}

const janitor = new Janitor();

export default janitor;
