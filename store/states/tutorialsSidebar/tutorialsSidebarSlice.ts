import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISection } from 'types';
import { IArticle } from 'types/section';

interface ICommentSidebarState {
  name: string;
  sections: ISection[];
}

const initialState: ICommentSidebarState = {
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
    changeArticleName(state, { payload }: PayloadAction<{ sectionId: string; article: IArticle }>) {
      const { sectionId, article } = payload;
      state.sections = state.sections.map((section) => {
        if (section.id !== sectionId) {
          return section;
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
  },
});

export const {
  changeName: changeTutorialName,
  addSection: addTutorialSection,
  editSection: editTutorialSection,
  changeArticleName: changeTutorialArticleName,
} = tutorialsSidebarSlice.actions;
export default tutorialsSidebarSlice.reducer;
