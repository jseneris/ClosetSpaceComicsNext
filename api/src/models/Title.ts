import mongoose from 'mongoose';
import { PublisherDoc } from './Publisher';
import { LocalTitleDoc } from './LocalTitle';

interface TitleAttrs {
  name: string;
  seoFriendlyName: string;
  yearStart: number;
  yearEnd: number;
  issueBegin: string;
  issueEnd: string;
  lastUpdate: Date;
  loneStarId: string;
  publisher: PublisherDoc;
  localTitle: LocalTitleDoc;
}

export interface TitleDoc extends mongoose.Document {
  name: string;
  seoFriendlyName: string;
  yearStart: number;
  yearEnd: number;
  issueBegin: string;
  issueEnd: string;
  lastUpdate: Date;
  loneStarId: string;
  publisher: PublisherDoc;
  localTitle: LocalTitleDoc;
}

interface TitleModel extends mongoose.Model<TitleDoc> {
  build(attr: TitleAttrs): TitleDoc;
}

const titleSchema = new mongoose.Schema(
  {
    oldId: Number,
    name: String,
    seoFriendlyName: String,
    yearStart: Number,
    yearEnd: Number,
    issueBegin: String,
    issueEnd: String,
    LastUpdate: Date,
    loneStarId: String,
    oldPublisherId: Number,
    publisher: {
      type: mongoose.Types.ObjectId,
      ref: 'Publisher',
    },
    oldLocalTitleId: Number,
    localTitle: {
      type: mongoose.Types.ObjectId,
      ref: 'LocalTitle',
    },
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.oldId;
        delete ret.oldPublisherId;
        delete ret.oldLocalTitleId;
      },
    },
  }
);

titleSchema.statics.build = (attrs: TitleAttrs) => {
  return new Title(attrs);
};

const Title = mongoose.model<TitleDoc, TitleModel>('Title', titleSchema);

export { Title };

// [Id] [int] IDENTITY(1,1) NOT NULL,
// [Name] [nvarchar](max) NULL,
// [SeoFriendlyName] [nvarchar](max) NULL,
// [YearStart] [int] NOT NULL,
// [YearEnd] [int] NULL,
// [IssueBegin] [nvarchar](max) NULL,
// [IssueEnd] [nvarchar](max) NULL,
// [LastUpdate] [datetime] NULL,
// [LoneStarId] [nvarchar](max) NULL,
// [PublisherId] [int] NOT NULL,
// [LocalTitleId] [int] NULL,
