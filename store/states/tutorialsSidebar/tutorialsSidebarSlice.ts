import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISection } from 'types';
import { IArticle } from 'types/section';

interface ICommentSidebarState {
  isRemoveArticleModalOpen: boolean;
  selectedArticle?: IArticle;
  isRemoveSectionModalOpen: boolean;
  selectedSection?: ISection;
  name: string;
  sections: ISection[];
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
    addSection(state, { payload }: PayloadAction<ISection>) {
      state.sections = [...state.sections, payload];
    },
    editSection(state, { payload }: PayloadAction<ISection>) {
      state.sections = state.sections.map((section) =>
        section.id === payload.id ? payload : section,
      );
    },
    addArticle(state, { payload }: PayloadAction<{ section: ISection; article: IArticle }>) {
      const { section, article } = payload;
      state.sections = state.sections.map((s) => {
        if (s.id !== section.id) return s;

        return { ...section, articles: [...section.articles, article] };
      });
    },
    changeArticle(state, { payload }: PayloadAction<{ section: ISection; article: IArticle }>) {
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
    setSelectedArticle(state, { payload }: PayloadAction<IArticle | undefined>) {
      state.selectedArticle = payload;
    },
    toggleRemoveArticleModal(state) {
      state.isRemoveArticleModalOpen = !state.isRemoveArticleModalOpen;
    },
    setSelectedSection(state, { payload }: PayloadAction<ISection | undefined>) {
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
