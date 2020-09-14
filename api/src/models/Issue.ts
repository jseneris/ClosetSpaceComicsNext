import mongoose from 'mongoose';
import { TitleDoc } from './Title';

interface IssueAttrs {
  seoFriendlyName: string;
  issueNumber: string;
  issueNumberOrdinal: number;
  description: string;
  coverPrice: number;
  releaseDate: Date;
  imageUrl: string;
  title: TitleDoc;
  createdDate: Date;
}

export interface IssueDoc extends mongoose.Document {
  seoFriendlyName: string;
  issueNumber: string;
  issueNumberOrdinal: number;
  description: string;
  coverPrice: number;
  releaseDate: Date;
  imageUrl: string;
  title: TitleDoc;
  createdDate: Date;
}

interface IssueModel extends mongoose.Model<IssueDoc> {
  build(attr: IssueAttrs): IssueDoc;
}

const issueSchema = new mongoose.Schema(
  {
    oldId: Number,
    seoFriendlyName: String,
    issueNumber: String,
    issueNumberOrdinal: Number,
    description: String,
    coverPrice: Number,
    releaseDate: Date,
    imageUrl: String,
    oldTitleId: Number,
    title: {
      type: mongoose.Types.ObjectId,
      ref: 'Title',
    },
    createdDate: Date,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.oldId;
        delete ret.oldTitleId;
      },
    },
  }
);

issueSchema.statics.build = (attrs: IssueAttrs) => {
  return new Issue(attrs);
};

const Issue = mongoose.model<IssueDoc, IssueModel>('Issue', issueSchema);

export { Issue };

// [Id] [int] IDENTITY(1,1) NOT NULL,
// [SeoFriendlyName] [nvarchar](max) NULL,
// [IssueNumberOrdinal] [int] NOT NULL,
// [Description] [nvarchar](max) NULL,
// [CoverPrice] [decimal](18, 2) NOT NULL,
// [ReleaseDate] [datetime] NULL,
// [ImageUrl] [nvarchar](max) NULL,
// [TitleId] [int] NOT NULL,
// [CreatedDated] [datetime] NOT NULL,
