import mongoose from 'mongoose';
import { BoxDoc } from './Box';
import { IssueDoc } from './Issue';
import { LocalTitleDoc } from './LocalTitle';
import { PurchaseDoc } from './Purchase';
import { TitleDoc } from './Title';

interface PurchaseItemAttrs {
  localTitle: LocalTitleDoc;
  condition: number;
  order: number;
  notes: string;
  gradingService: number;
  gradedCondition: number;
  paperQuality: number;
  certificateNumber: string;
  purchase: PurchaseDoc;
  boxId: BoxDoc;
  title: TitleDoc;
  issue: IssueDoc;
  issueNumber: string;
  issueNumberOrdinal: number;
}

export interface PurchaseItemDoc extends mongoose.Document {
  localTitle: LocalTitleDoc;
  condition: number;
  order: number;
  notes: string;
  gradingService: number;
  gradedCondition: number;
  paperQuality: number;
  certificateNumber: string;
  purchase: PurchaseDoc;
  box: BoxDoc;
  title: TitleDoc;
  issue: IssueDoc;
  issueNumber: string;
  issueNumberOrdinal: number;
}

interface PurchaseItemModel extends mongoose.Model<PurchaseItemDoc> {
  build(attr: PurchaseItemAttrs): PurchaseItemDoc;
}

const purchaseItemSchema = new mongoose.Schema(
  {
    oldId: Number,
    oldLocalTitleId: Number,
    localTitle: {
      type: mongoose.Types.ObjectId,
      ref: 'LocalTitle',
    },
    oldLocalIssueId: Number,
    condition: Number,
    order: Number,
    notes: String,
    gradingService: Number,
    gradedCondition: Number,
    paperQuality: Number,
    certificateNumber: String,
    oldPurchaseId: Number,
    purchase: {
      type: mongoose.Types.ObjectId,
      ref: 'Purchase',
    },
    oldBoxId: Number,
    box: {
      type: mongoose.Types.ObjectId,
      ref: 'Box',
    },
    oldTitleId: Number,
    title: {
      type: mongoose.Types.ObjectId,
      ref: 'Title',
    },
    oldIssueId: Number,
    issue: {
      type: mongoose.Types.ObjectId,
      ref: 'Issue',
    },
    issueNumber: String,
    issueNumberOrdinal: Number,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
        delete ret.oldId;
        delete ret.oldBoxId;
        delete ret.oldIssueId;
        delete ret.oldLocalIssueId;
        delete ret.oldLocalTitleId;
        delete ret.oldPurchaseId;
        delete ret.oldTitleId;
      },
    },
  }
);

purchaseItemSchema.statics.build = (attrs: PurchaseItemAttrs) => {
  return new PurchaseItem(attrs);
};

const PurchaseItem = mongoose.model<PurchaseItemDoc, PurchaseItemModel>(
  'PurchaseItem',
  purchaseItemSchema
);

export { PurchaseItem };

// public class PurchaseItemMigrationModel
// {
//   public int id { get; set; }
//   public int? localTitleId { get; set; }
//   public int? localIssueId { get; set; }
//   public int condition { get; set; }
//   public int order { get; set; }
//   public string notes { get; set; }
//   public int? gradingService { get; set; }
//   public int? gradedCondition { get; set; }
//   public int? paperQuality { get; set; }
//   public string certificateNumber { get; set; }
//   public int purchaseId { get; set; }
//   public int boxId { get; set; }
//   public int? titleId { get; set; }
//   public int? issueId { get; set; }
//   public string issueNumber { get; set; }
//   public int? issueNumberOrdinal { get; set; }
// }
