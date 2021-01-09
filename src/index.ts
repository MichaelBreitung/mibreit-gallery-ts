import DomTools from "./tools/domTools";
import Image from "./components/Image";
import ImageStage from "./components/ImageStage";

export const documentReady = DomTools.documentReady;

export function createSlideshow(): void {
  const imagesSelector = DomTools.getElements("#container > img");
  const images: Array<Image> = new Array();
  const imageStages: Array<ImageStage> = new Array();

  for (let i = 0; i < imagesSelector.length; i++) {
    const image = new Image(imagesSelector[i]);
    image.load();
    images.push(image)
    imageStages.push(new ImageStage(image));
  }
}

