import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ILabel, ITutorial, ITutorialSection } from 'types';
import { ITutorialSectionItem } from 'types/section';
import { removeArticle, removeSection } from 'utils';

import {
  IAddSectionByTargetPayloadAction,
  IAddTutorialArticleBytargetPayloadAction,
} from './tutorialsSidebarSlice.types';

interface ITutorialSidebarState {
  isRemoveArticleModalOpen: boolean;
  isPublishTutorialModalOpen: boolean;
  selectedArticle?: ITutorialSectionItem;
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
    addSectionItem(state, { payload: section }: PayloadAction<ITutorialSection>) {
      const newItem: ITutorialSectionItem = { id: '', name: 'Maqola nomi', defaultFocused: true };

      state.sections = state.sections.map((s): ITutorialSection => {
        if (s.id !== section.id) return s;

        return { ...section, items: [...section.items, newItem] };
      });
    },
    addSectionItemByTarget(
      state,
      { payload }: PayloadAction<IAddTutorialArticleBytargetPayloadAction>,
    ) {
      const { section, target } = payload;
      const newItem: ITutorialSectionItem = {
        id: '',
        name: 'Maqola nomi',
        defaultFocused: true,
        target,
      };

      const items: ITutorialSectionItem[] = [];
      section.items.forEach((item) => {
        items.push(item);
        if (item.id === target.id) {
          items.push(newItem);
        }
      });

      state.sections = state.sections.map((s) => (s.id !== section.id ? s : { ...section, items }));
    },
    editSectionItem(
      state,
      { payload }: PayloadAction<{ section: ITutorialSection; item: ITutorialSectionItem }>,
    ) {
      state.sections = state.sections.map((section) => {
        if (section.id === payload.section.id) {
          section.items = section.items.map((item) =>
            item.id === payload.item.id ? payload.item : item,
          );
        }
        return section;
      });
    },
    changeArticle(
      state,
      { payload }: PayloadAction<{ section: ITutorialSection; article: ITutorialSectionItem }>,
    ) {
      const { section, article } = payload;
      state.sections = state.sections.map((s) => {
        if (s.id !== section.id) {
          return s;
        }

        const editedArticles = section.items.map((a) => {
          if (a.id !== article.id) {
            return a;
          }
          return article;
        });

        return { ...section, articles: editedArticles };
      });
    },
    removeArticle(state, { payload }: PayloadAction<string>) {
      state.sections = removeArticle(state.sections, payload);
    },
    setSelectedArticle(state, { payload }: PayloadAction<ITutorialSectionItem | undefined>) {
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
  // section methods
  addSection: addTutorialSection,
  editSection: editTutorialSection,
  // section item methods
  editSectionItem: editTutorialSectionItem,
  addSectionItem: addTutorialSectionItem,
  addSectionItemByTarget: addTutorialSectionItemByTarget,
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
