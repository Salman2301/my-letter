
import type { TemplateConfig } from "./types";

export const blankTemplate: TemplateConfig = {
  slug: "blank",
  version:"0.0.1",
  margin: {
    top: {
      value: 0,
    type: "px"
    },
    bottom: {
      value: 0,
      type: "px"
    },
    left: {
      value: 0,
      type: "px"
    },
    right: {
      value: 0,
      type: "px"
    }
  },
  padding: {
    top: {
      value: 0,
      type: "px"
    },
    bottom: {
      value: 0,
      type: "px"
    },
    left: {
      value: 0,
      type: "px"
    },
    right: {
      value: 0,
      type: "px"
    }
  },
  border: {
    top: {
      strokewidth: 0,
      strokeColor: "#ffffff00"  
    },
    bottom: {
      strokewidth: 0,
      strokeColor: "#ffffff00"  
    },
    left: {
      strokewidth: 0,
      strokeColor: "#ffffff00"  
    },
    right: {
      strokewidth: 0,
      strokeColor: "#ffffff00"  
    }
  },
  background: [{
    type: "color-plain",
    color: "#fff",
    opacity: 1
  }],
  fontFamily: undefined,
  fontColor: "#000"
} 

// Create different template based on the configurations
// Create a blank template

export const templateList: Record<string, TemplateConfig> = {
  blank: {...blankTemplate, slug: "blank"},
  black: {
    ...blankTemplate,
    slug: "black",
    background: [
      {
        color: "#000",
        type: "color-plain"
      }
    ],
    fontColor: "#fff"
  }
}

