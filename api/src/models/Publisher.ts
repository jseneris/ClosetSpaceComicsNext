import mongoose from 'mongoose';

interface PublisherAttrs {
  name: string;
  seoFriendlyName: string;
  imageName: string;
  displayOrder: number;
}

export interface PublisherDoc extends mongoose.Document {
  name: string;
  seoFriendlyName: string;
  imageName: string;
  displayOrder: number;
}

interface PublisherModel extends mongoose.Model<PublisherDoc> {
  build(attr: PublisherAttrs): PublisherDoc;
}

const publisherSchema = new mongoose.Schema(
  {
    oldId: Number,
    name: String,
    seoFriendlyName: String,
    oldLocalId: Number,
    imageName: String,
    displayOrder: Number,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.oldId;
        delete ret.oldLocalId;
      },
    },
  }
);

publisherSchema.statics.build = (attrs: PublisherAttrs) => {
  return new Publisher(attrs);
};

const Publisher = mongoose.model<PublisherDoc, PublisherModel>(
  'Publisher',
  publisherSchema
);

export { Publisher };

// [Id] [int] IDENTITY(1,1) NOT NULL,
// [Name] [nvarchar](max) NULL,
// [SeoFriendlyName] [nvarchar](max) NULL,
// [LocalId] [int] NULL,
// [ImageName] [nvarchar](max) NULL,
// [DisplayOrder] [nvarchar](max) NULL,
