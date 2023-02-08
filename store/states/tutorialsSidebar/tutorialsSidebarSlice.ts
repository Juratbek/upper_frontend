import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILabel, ITutorial, ITutorialSection } from 'types';
import { ITutorialArticle } from 'types/section';
import { removeArticle, removeSection } from 'utils';

import {
  IAddSectionByTargetPayloadAction,
  IAddTutorialArticleBytargetPayloadAction,
  IAddTutorialArticlePayloadAction,
} from './tutorialsSidebarSlice.types';

interface ITutorialSidebarState {
  isRemoveArticleModalOpen: boolean;
  isPublishTutorialModalOpen: boolean;
  selectedArticle?: ITutorialArticle;
  isRemoveSectionModalOpen: boolean;
  selectedSection?: ITutorialSection;
  name: string;
  sections: ITutorialSection[];
  labels: ILabel[];
  imgUrl: string;
}

const initialState: ITutorialSidebarState = {
  isRemoveArticleModalOpen: false,
  isRemoveSectionModalOpen: false,
  isPublishTutorialModalOpen: false,
  name: '',
  sections: [],
  labels: [],
  imgUrl: '',
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
    removeSection(state, { payload }: PayloadAction<string>) {
      const sectionId = payload;
      state.sections = removeSection(state.sections, sectionId);
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
    removeArticle(state, { payload }: PayloadAction<string>) {
      state.sections = removeArticle(state.sections, payload);
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
    setSelectedSection(state, { payload }: PayloadAction<ITutorialSection | undefined>) {
      state.selectedSection = payload;
    },
    toggleRemoveSectionModal(state) {
      state.isRemoveSectionModalOpen = !state.isRemoveSectionModalOpen;
    },
    closeRemoveSectionModal(state) {
      state.isRemoveSectionModalOpen = false;
    },
    publishTutorialModalHandler(state, action: PayloadAction<{ isOpen: boolean }>) {
      state.isPublishTutorialModalOpen = action.payload.isOpen;
    },
    setTutorial(state, { payload }: PayloadAction<ITutorial>) {
      const { name, sections, labels, imgUrl } = payload;
      state.sections = sections || [];
      state.name = name;
      state.labels = labels;
      state.imgUrl = imgUrl;
    },
    clearTutorial(state) {
      state.name = '';
      state.sections = [];
    },
    removeArticleModalHandler(state, { payload }: PayloadAction<boolean>) {
      state.isRemoveArticleModalOpen = payload;
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
  removeSection: removeTutorialSection,
  removeArticle: removeTutorialArticle,
  setTutorial,
  clearTutorial,
  toggleRemoveSectionModal,
  closeRemoveSectionModal,
  setSelectedArticle,
  setSelectedSection,
  publishTutorialModalHandler,
  removeArticleModalHandler,
} = tutorialsSidebarSlice.actions;
export default tutorialsSidebarSlice.reducer;
