import mongoose from 'mongoose';
import { PurchaseItemDoc } from './PurchaseItem';

interface PhotoAttrs {
  name: string;
  purchaseItem: PurchaseItemDoc;
}

interface PhotoDoc extends mongoose.Document {
  name: string;
  purchaseItem: PurchaseItemDoc;
}

interface PhotoModel extends mongoose.Model<PhotoDoc> {
  build(attr: PhotoAttrs): PhotoDoc;
}

const photoSchema = new mongoose.Schema(
  {
    oldId: Number,
    name: String,
    oldPurchaseItemId: Number,
    purchaseItem: {
      type: mongoose.Types.ObjectId,
      ref: 'PurchaseItem',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.oldId;
        delete ret.oldPurchaseItemId;
      },
    },
  }
);

photoSchema.statics.build = (attrs: PhotoAttrs) => {
  return new Photo(attrs);
};

const Photo = mongoose.model<PhotoDoc, PhotoModel>('Box', photoSchema);

export { Photo };

// public class PhotoMigrationModel
// {
//   public int id { get; set; }
//   public string name { get; set; }
//   public int purchaseItemId { get; set; }
// }
