import DomTools from "./tools/domTools";
import Image from "./components/Image";
import {EImageScaleMode} from "./components/ImageStage";
import ImageStageFitAspect from "./components/ImageStageFitAspect";

export const documentReady = DomTools.documentReady;
export const ImageScaleMode = EImageScaleMode;

export async function createSlideshow(scaleMode : EImageScaleMode = EImageScaleMode.FIT_ASPECT): Promise<void> {
  const imagesSelector = DomTools.getElements("#container > img");
  const images: Array<Image> = new Array();
  const imageStages: Array<ImageStageFitAspect> = new Array();

  for (let i = 0; i < imagesSelector.length; i++) {
    const image = new Image(imagesSelector[i]);

    // TODO: factory to create proper stage
    const imageStage = new ImageStageFitAspect(image.getElement(), image.getWidth(), image.getHeight());
    
    image.load().then((success: boolean) => {
      imageStage.applyScaleMode();
    });
    
    images.push(image)
    imageStages.push(imageStage);
  }
}

