import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITutorial, ITutorialSection } from 'types';
import { ITutorialArticle } from 'types/section';

import {
  IAddSectionByTargetPayloadAction,
  IAddTutorialArticleBytargetPayloadAction,
  IAddTutorialArticlePayloadAction,
} from './tutorialsSidebarSlice.types';

interface ICommentSidebarState {
  isRemoveArticleModalOpen: boolean;
  selectedArticle?: ITutorialArticle;
  isRemoveSectionModalOpen: boolean;
  selectedSection?: ITutorialSection;
  name: string;
  sections: ITutorialSection[];
}

const initialState: ICommentSidebarState = {
  isRemoveArticleModalOpen: false,
  isRemoveSectionModalOpen: false,
  name: '',
  sections: [],
};

const tutorialsSidebarSlice = createSlice({
  name: 'tutorialsSidebar',
  initialState,
  reducers: {
    changeName(state, { payload }: PayloadAction<string>) {
      state.name = payload;
    },
    addSection(state, { payload }: PayloadAction<ITutorialSection>) {
      state.sections = [...state.sections, payload];
    },
    addSectionByTarget(state, { payload }: PayloadAction<IAddSectionByTargetPayloadAction>) {
      const { newSection, targetSection } = payload;
      const sections: ITutorialSection[] = [];
      state.sections.forEach((section) => {
        sections.push(section);
        if (section.id === targetSection.id) {
          sections.push(newSection);
        }
      });
      state.sections = sections;
    },
    editSection(state, { payload }: PayloadAction<ITutorialSection>) {
      state.sections = state.sections.map((section) =>
        section.id === payload.id ? payload : section,
      );
    },
    addArticle(state, { payload }: PayloadAction<IAddTutorialArticlePayloadAction>) {
      const { section, article } = payload;
      state.sections = state.sections.map((s) => {
        if (s.id !== section.id) return s;

        return { ...section, articles: [...section.articles, article] };
      });
    },
    addArticleByTarget(
      state,
      { payload }: PayloadAction<IAddTutorialArticleBytargetPayloadAction>,
    ) {
      const { section, article, target } = payload;
      const articles: ITutorialArticle[] = [];
      section.articles.forEach((a) => {
        articles.push(a);
        if (a.id === target.id) {
          articles.push(article);
        }
      });

      state.sections = state.sections.map((s) =>
        s.id !== section.id ? s : { ...section, articles },
      );
    },
    changeArticle(
      state,
      { payload }: PayloadAction<{ section: ITutorialSection; article: ITutorialArticle }>,
    ) {
      const { section, article } = payload;
      state.sections = state.sections.map((s) => {
        if (s.id !== section.id) {
          return s;
        }

        const editedArticles = section.articles.map((a) => {
          if (a.id !== article.id) {
            return a;
          }
          return article;
        });

        return { ...section, articles: editedArticles };
      });
    },
    setSelectedArticle(state, { payload }: PayloadAction<ITutorialArticle | undefined>) {
      state.selectedArticle = payload;
    },
    toggleRemoveArticleModal(state) {
      state.isRemoveArticleModalOpen = !state.isRemoveArticleModalOpen;
    },
    closeRemoveArticleModal(state) {
      state.isRemoveArticleModalOpen = false;
    },
    setSelectedSection(state, { payload }: PayloadAction<ITutorialSection | undefined>) {
      state.selectedSection = payload;
    },
    toggleRemoveSectionModal(state) {
      state.isRemoveSectionModalOpen = !state.isRemoveSectionModalOpen;
    },
    closeRemoveSectionModal(state) {
      state.isRemoveSectionModalOpen = false;
    },
    setTutorial(state, { payload }: PayloadAction<ITutorial>) {
      const { name, sections } = payload;
      state.sections = sections || [];
      state.name = name;
    },
    clearTutorial(state) {
      state.name = '';
      state.sections = [];
    },
  },
});

export const {
  changeName: changeTutorialName,
  addSection: addTutorialSection,
  editSection: editTutorialSection,
  addArticle: addTutorialArticle,
  addArticleByTarget: addTutorialArticleByTarget,
  changeArticle: changeTutorialArticle,
  addSectionByTarget: addTutorialSectionByTarget,
  setTutorial,
  clearTutorial,
  toggleRemoveArticleModal,
  closeRemoveArticleModal,
  toggleRemoveSectionModal,
  closeRemoveSectionModal,
  setSelectedArticle,
  setSelectedSection,
} = tutorialsSidebarSlice.actions;
export default tutorialsSidebarSlice.reducer;
