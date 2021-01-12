import DomTools from "./tools/domTools";
import Image from "./components/Image";
import IImageStage from "./components/IImageStage";
import {EImageScaleMode, createImageState} from "./tools/createImageStage";

export const documentReady = DomTools.documentReady;
export const ImageScaleMode = EImageScaleMode;

export async function createSlideshow(scaleMode : EImageScaleMode = EImageScaleMode.FIT_ASPECT): Promise<void> {
  const imagesSelector = DomTools.getElements("#container > img");
  const images: Array<Image> = new Array();
  const imageStages: Array<IImageStage> = new Array();

  for (let i = 0; i < imagesSelector.length; i++) {
    const image = new Image(imagesSelector[i]);

    const imageStage = createImageState(scaleMode, imagesSelector[i], image.getWidth(), image.getHeight());
    
    image.load().then((success: boolean) => {
      imageStage.applyScaleMode();
    });
    
    images.push(image)
    imageStages.push(imageStage);
  }
}

