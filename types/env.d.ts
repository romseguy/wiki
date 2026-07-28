import { Password } from "@hapi/iron";
import { TOKEN_NAME } from "utils/auth/cookie";

declare global {
  type UserMetadata = {
    email: string;
    userId: string;
    //userImage?: Base64Image;
    userName: string;
    isAdmin?: boolean;
  };

  type Session = {
    [TOKEN_NAME]?: string | null;
    user: UserMetadata;
  };

  namespace NodeJS {
    interface ProcessEnv {
      ENV: "development" | "production" | "test";
      DATABASE_URL: string;
      SECRET: string | Password | Password.Hash;
      NEXT_PUBLIC_MAGIC_PUBLISHABLE_KEY: string;
    }
  }

  interface IEntity extends Record<string, any> {
    _id: string;
    createdAt?: string;
    createdBy?: IUser | string;
    updatedAt?: string;
  }

  interface IOrg extends IEntity {
    orgName: string;
    orgUrl: string;
    redirectUrl?: string;
    orgType: EOrgType;
    orgDescription?: string;
    orgAddress: IEntityAddress[];
    orgCity?: string;
    orgLat?: number;
    orgLng?: number;
    orgEmail: IEntityEmail[];
    orgPhone: IEntityPhone[];
    orgWeb: IEntityWeb[];
    orgTopicCategories: IOrgTopicCategory[];
    orgTopicOrder?: ETopicsListOrder;
    orgTopics: ITopic[];
    orgStyles: IEntityStyles;
    orgBanner?: IEntityBanner;
    orgLogo?: IEntityLogo;
    orgPassword?: string;
    orgSalt?: string;
    orgTabs?: IOrgTab[];
    orgVisibility: EOrgVisibility;
    orgs: IOrg[];
    orgPermissions?: IOrgPermissions;
    isApproved?: boolean;
    isArchived?: boolean;
  }

  interface GetOrgParams {
    orgUrl: string;
    hash?: string | void;
    populate?: string;
  }

  interface ITopic extends IEntity {
    org?: IOrg;
    isPinned?: boolean;
    topicCategory?: string | null;
    topicMessages: ITopicMessage[];
    topicMessagesDisabled?: boolean;
    topicName: string;
    topicVisibility: string[];
  }
}
