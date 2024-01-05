
export interface TemplateConfigWithId extends TemplateConfig {
  id: string;
}

export interface TemplateConfig {
  margin: {
    top: {
      value: number;
      type: "px"
    },
    bottom: {
      value: number;
      type: "px"
    },
    left: {
      value: number;
      type: "px"
    },
    right: {
      value: number;
      type: "px"
    }
  },
  padding: {
    top: {
      value: number;
      type: "px"
    },
    bottom: {
      value: number;
      type: "px"
    },
    left: {
      value: number;
      type: "px"
    },
    right: {
      value: number;
      type: "px"
    }
  },
  border: {
    top: {
      strokewidth: number;
      strokeColor: string;  
    },
    bottom: {
      strokewidth: number;
      strokeColor: string;  
    },
    left: {
      strokewidth: number;
      strokeColor: string;  
    },
    right: {
      strokewidth: number;
      strokeColor: string;  
    }
  },
  background: (BackgroundColorPlain | BackgroundColorGradient | BackgroundImage)[];
  fontFamily?: string;
  fontColor?: string;

}

interface BackgroundColorPlain {
  type: "color-plain";
  color: string;
  opacity?: number;
}

interface BackgroundColorGradient {
  type: "color-gradient";
  mode: "linear-gradient" | "radial-gradient";
  colorFrom: string;
  colorTo: string;
  from: {
    x: number;
    y: number;
  };
  to: {
    x: number;
    y: number;
  };
  opacity: number;
}

interface BackgroundImage {
  type: "image";
  stretch: "cover" | "repeat" | "no-repeat";
  src: string;
  size?: {
    width: number;
    height: number;
  }
}