import { model, models, Schema } from "mongoose";

const imageSchema = new Schema(
  {
    originalUrl: {
      type: String,
      required: true,
    },
    generatedUrl: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: false,
    },
    action: {
      type: String,
      enum: [
        "clean-studio",
        "change-color",
        "upgrade-model",
        "create-campaign",
      ],
      required: true,
    },
    option: {
      type: String,
      enum: [
        "white-studio",
        "beige-studio",
        "dark-luxury",
        "white",
        "black",
        "red",
        "gold",
        "pink",
        "wine",
        "cream",
        "navy",
        "emerald",
        "olive",
        "silver",
        "mocha",
        "light-skin-model",
        "dark-skin-model",
        "male-model",
        "female-model",
        "couple-shoot",
        "three-friends",
        "family-of-three",
        "family-of-five",
      ],
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    versionKey: false,
  },
);

export const ImageModel = models.Image || model("Image", imageSchema);
