export interface SlideContent {
  id: string;
  type: "title" | "subtitle" | "text";
  text: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
}

export interface Slide {
  id: number;
  title: string;
  subtitle: string;
  content: SlideContent[];
  theme?: ThemeSettings;
}

export type ContentType = "title" | "subtitle" | "text";

export interface ThemeSettings {
  primaryColor: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  gradientType: "solid" | "linear" | "radial";
  gradientDirection?: string;
  secondaryColor?: string;
}

export interface AppSettings {
  theme: ThemeSettings;
  showSettings: boolean;
}
