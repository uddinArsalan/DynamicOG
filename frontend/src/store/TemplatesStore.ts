import { templateServices } from "@/services/templates.services";
import { Template } from "@/types";
import { create } from "zustand";

interface TemplateStoreActions {
  getTemplates: () => Promise<void>;
}

interface TemplateStoreValue {
  templates: Template[];
  loading: boolean;
}

type TemplateStore = TemplateStoreValue & TemplateStoreActions;

export const useTemplateStore = create<TemplateStore>()((set) => ({
  templates: [],
  loading: false,
  getTemplates: async () => {
    set({ loading: true });
    try {
      const res = await templateServices.getTemplates();
      const templates = res.data.data.templates;
      set({ templates, loading: false });
    } catch (error) {
      set({ templates: [], loading: false });
      console.log(error);
    }
  },
}));
