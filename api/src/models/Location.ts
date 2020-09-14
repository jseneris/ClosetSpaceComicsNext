import mongoose from 'mongoose';
import { UserDoc } from './User';
import { BoxDoc } from './Box';

interface LocationAttrs {
  name: string;
  user: UserDoc;
  order: number;
  boxes: [BoxDoc];
}

export interface LocationDoc extends mongoose.Document {
  name: string;
  user: UserDoc;
  order: number;
  boxes: [BoxDoc];
}

interface LocationModel extends mongoose.Model<LocationDoc> {
  build(attr: LocationAttrs): LocationDoc;
}

const locationSchema = new mongoose.Schema(
  {
    oldId: Number,
    name: String,
    oldUserId: Number,
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
    },
    order: Number,
    boxes: [
      {
        type: mongoose.Types.ObjectId,
        ref: 'Box',
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.oldId;
        delete ret.oldUserId;
      },
    },
  }
);

locationSchema.statics.build = (attrs: LocationAttrs) => {
  return new Location(attrs);
};

const Location = mongoose.model<LocationDoc, LocationModel>(
  'Location',
  locationSchema
);

export { Location };

// public class LocationMigrationModel
// {
//   public int id { get; set; }
//   public string name { get; set; }
//   public int userId { get; set; }
//   public int order { get; set; }
// 	}
