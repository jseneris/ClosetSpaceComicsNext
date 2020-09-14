import mongoose from 'mongoose';
import { LocationDoc } from './Location';
import {PurchaseItemDoc} from './PurchaseItem';
import { UserDoc } from './User';

interface BoxAttrs {
  name: string;
  order: number;
  location: LocationDoc;
  user: UserDoc;
  createdDate: Date;
  items: [PurchaseItemDoc];
}

export interface BoxDoc extends mongoose.Document {
  name: string;
  order: number;
  location: LocationDoc;
  user: UserDoc;
  createdDate: Date;
  items: [PurchaseItemDoc];
}

interface BoxModel extends mongoose.Model<BoxDoc> {
  build(attr: BoxAttrs): BoxDoc;
}

const boxSchema = new mongoose.Schema(
  {
    oldId: Number,
    name: String,
    order: Number,
    oldLocationId: Number,
    location: {
      type: mongoose.Types.ObjectId,
      ref: 'Location',
    },
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
    createdDate: Date,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.oldId;
        delete ret.oldLocationId;
        delete ret.oldUserId;
      },
    },
  }
);

boxSchema.statics.build = (attrs: BoxAttrs) => {
  return new Box(attrs);
};

const Box = mongoose.model<BoxDoc, BoxModel>('Box', boxSchema);

export { Box };

// public class BoxMigrationModel
// {
// 	public int id { get; set; }
// 	public string name { get; set; }
// 	public int order { get; set; }
// 	public int locationId { get; set; }
// 	public int userId { get; set; }
// }
