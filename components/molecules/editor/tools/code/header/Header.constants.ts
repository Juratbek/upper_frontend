import { cpp } from '@codemirror/lang-cpp';
import { css } from '@codemirror/lang-css';
import { go } from '@codemirror/lang-go';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { markdown } from '@codemirror/lang-markdown';
import { python } from '@codemirror/lang-python';
import { sql } from '@codemirror/lang-sql';

import { ILanguage } from '../Code.types';

export const LANGUAGES: Record<string, ILanguage> = {
  javascript: {
    label: 'JavaScript',
    extension: javascript,
  },
  java: {
    label: 'Java',
    extension: javascript,
  },
  python: {
    label: 'Python',
    extension: python,
  },
  css: {
    label: 'CSS',
    extension: css,
  },
  cpp: {
    label: 'C++',
    extension: cpp,
  },
  html: {
    label: 'HTML',
    extension: html,
  },
  go: {
    label: 'Go',
    extension: go,
  },
  markdown: {
    label: 'Markdown',
    extension: markdown,
  },
  sql: {
    label: 'SQL',
    extension: sql,
  },
} as const;
