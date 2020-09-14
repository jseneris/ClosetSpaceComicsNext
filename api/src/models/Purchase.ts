import mongoose from 'mongoose';
import { UserDoc } from './User';
import { PurchaseItemDoc } from './PurchaseItem';

interface PurchaseAttrs {
  description: string;
  purchaseDate: Date;
  price: number;
  user: UserDoc;
  items: [PurchaseItemDoc];
}

export interface PurchaseDoc extends mongoose.Document {
  description: string;
  purchaseDate: Date;
  price: number;
  user: UserDoc;
  items: [PurchaseItemDoc];
}

interface PurchaseModel extends mongoose.Model<PurchaseDoc> {
  build(attr: PurchaseAttrs): PurchaseDoc;
}

const purchaseSchema = new mongoose.Schema(
  {
    oldId: Number,
    description: String,
    purchaseDate: Date,
    price: Number,
    oldUserId: Number,
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    items: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'PurchaseItem',
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

purchaseSchema.statics.build = (attrs: PurchaseAttrs) => {
  return new Purchase(attrs);
};

const Purchase = mongoose.model<PurchaseDoc, PurchaseModel>(
  'Purchase',
  purchaseSchema
);

export { Purchase };

// public class PurchaseMigrationModel
// {
//   public int id { get; set; }
//   public string description { get; set; }
//   public DateTime purchaseDate { get; set; }
//   public decimal price { get; set; }
//   public int userId { get; set; }
// }
