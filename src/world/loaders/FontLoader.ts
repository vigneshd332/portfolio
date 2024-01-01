import { FontLoader, Font } from "three/examples/jsm/loaders/FontLoader";

export async function loadFont(): Promise<Font> {
  return new Promise((resolve) => {
    const loader = new FontLoader();
    loader.load("fonts/Poppins.json", (font: Font) => {
      resolve(font);
    });
  });
}
