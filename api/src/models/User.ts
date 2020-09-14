import mongoose from 'mongoose';

interface UserAttrs {
  userName: string;
  password: string;
  firebaseId: string;
}

export interface UserDoc extends mongoose.Document {
  userName: string;
  password: string;
  firebaseId: string;
}

interface UserModel extends mongoose.Model<UserDoc> {
  build(attr: UserAttrs): UserDoc;
}

const userSchema = new mongoose.Schema(
  {
    oldId: Number,
    userName: String,
    password: String,
    firebaseId: String,
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret.__v;
        delete ret._id;
        delete ret.old;
      },
    },
  }
);

userSchema.statics.build = (attrs: UserAttrs) => {
  return new User(attrs);
};

const User = mongoose.model<UserDoc, UserModel>('User', userSchema);

export { User };

// public class UserMigrationModel
// {
//   public int id { get; set; }
//   public string userName {get;set;}
//   public string password { get; set; }
//   public string firebaseId { get; set; }
// }
