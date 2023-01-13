import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITutorialSection } from 'types';
import { ITutorialArticle } from 'types/section';

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
  name: "To'plam nomi",
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
    editSection(state, { payload }: PayloadAction<ITutorialSection>) {
      state.sections = state.sections.map((section) =>
        section.id === payload.id ? payload : section,
      );
    },
    addArticle(
      state,
      { payload }: PayloadAction<{ section: ITutorialSection; article: ITutorialArticle }>,
    ) {
      const { section, article } = payload;
      state.sections = state.sections.map((s) => {
        if (s.id !== section.id) return s;

        return { ...section, articles: [...section.articles, article] };
      });
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
    setSelectedSection(state, { payload }: PayloadAction<ITutorialSection | undefined>) {
      state.selectedSection = payload;
    },
    toggleRemoveSectionModal(state) {
      state.isRemoveSectionModalOpen = !state.isRemoveSectionModalOpen;
    },
  },
});

export const {
  changeName: changeTutorialName,
  addSection: addTutorialSection,
  editSection: editTutorialSection,
  addArticle: addTutorialArticle,
  changeArticle: changeTutorialArticle,
  toggleRemoveArticleModal,
  toggleRemoveSectionModal,
  setSelectedArticle,
  setSelectedSection,
} = tutorialsSidebarSlice.actions;
export default tutorialsSidebarSlice.reducer;
