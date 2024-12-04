export type User = {
  email: string;
  membershipId: number;
  name: string;
  photoUrl?: string;
  id: string;
};
export enum UserRole {
  ADMIN = "ADMIN",
  REGULAR = "REGULAR",
}
export enum Verification {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  REJECTED = "REJECTED",
}
export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHER = "OTHER",
}

export enum BloodGroup {
  A_POS = "A_POSITIVE",
  A_NEG = "A_NEGATIVE",
  B_POS = "B_POSITIVE",
  B_NEG = "B_NEGATIVE",
  AB_POS = "AB_POSITIVE",
  AB_NEG = "AB_NEGATIVE",
  O_POS = "O_POSITIVE",
  O_NEG = "O_NEGATIVE",
}

export enum UserStatus {
  RETIRED = "RETIRED",
  WORKING = "WORKING",
  EXPIRED = "EXPIRED",
}
export enum Department {
  LSGD = "LSGD",
  PWD = "PWD",
  IRRIGATION = "IRRIGATION",
}
export enum Designation {
  ASSISTANT_ENGINEER = "ASSISTANT_ENGINEER",
  ASSISTANT_EXECUTIVE_ENGINEER = "ASSISTANT_EXECUTIVE_ENGINEER",
  EXECUTIVE_ENGINEER = "EXECUTIVE_ENGINEER",
  SUPERINTENDING_ENGINEER = "SUPERINTENDING_ENGINEER",
  CHIEF_ENGINEER = "CHIEF_ENGINEER",
}

export enum District {
  KASARAGOD = "KASARAGOD",
  KANNUR = "KANNUR",
  WAYANAD = "WAYANAD",
  KOZHIKODE = "KOZHIKODE",
  MALAPPURAM = "MALAPPURAM",
  PALAKKAD = "PALAKKAD",
  THRISSUR = "THRISSUR",
  ERNAKULAM = "ERNAKULAM",
  IDUKKI = "IDUKKI",
  KOTTAYAM = "KOTTAYAM",
  ALAPPUZHA = "ALAPPUZHA",
  PATHANAMTHITTA = "PATHANAMTHITTA",
  KOLLAM = "KOLLAM",
  THIRUVANANTHAPURAM = "THIRUVANANTHAPURAM",
}
export enum CommitteeType {
  NONE = "NONE",
  STATE = "STATE",
  DISTRICT = "DISTRICT",
}

export enum StatePositionTitle {
  PRESIDENT = "PRESIDENT",
  VICE_PRESIDENT = "VICE_PRESIDENT",
  GENERAL_SECRETARY = "GENERAL_SECRETARY",
  JOINT_SECRETARY = "JOINT_SECRETARY",
  TREASURER = "TREASURER",
  EDITOR = "EDITOR",
  EXECUTIVE_COMMITTEE_MEMBER = "EXECUTIVE_COMMITTEE_MEMBER",
  IMMEDIATE_PAST_PRESIDENT = "IMMEDIATE_PAST_PRESIDENT",
  IMMEDIATE_PAST_SECRETARY = "IMMEDIATE_PAST_SECRETARY",
}

export enum DistrictPositionTitle {
  DISTRICT_PRESIDENT = "DISTRICT_PRESIDENT",
  DISTRICT_SECRETARY = "DISTRICT_SECRETARY",
}

export type CompleteUser = {
  id: string;
  // Personal Info
  name: string;
  dob: Date;
  gender: Gender;
  bloodGroup: BloodGroup;
  userRole: UserRole;
  // Employment Info
  userStatus: UserStatus;
  department?: Department;
  designation?: Designation;
  officeAddress?: string;
  workDistrict?: District;
  // Contact Info
  personalAddress: string;
  homeDistrict: District;
  email: string;
  phoneNumber?: string;
  mobileNumber: string;
  // Other Info
  photoUrl?: string;
  membershipId?: number;
  photoId?: string;
  committeeType?: CommitteeType;
  positionState?: StatePositionTitle;
  positionDistrict?: DistrictPositionTitle;
  createdAt: Date;
  // ... add other fields as needed
};

export enum SecurityQuestionType {
  MOTHERS_MAIDEN_NAME = "MOTHERS_MAIDEN_NAME",
  FIRST_PET = "FIRST_PET",
  FIRST_SCHOOL = "FIRST_SCHOOL",
  FAVOURITE_BOOK = "FAVOURITE_BOOK",
  FAVOURITE_CAR = "FAVOURITE_CAR",
}
export type RequestType = "PROMOTION" | "TRANSFER" | "RETIREMENT";
export type TransferRequest = {
  newWorkDistrict: District;
  newOfficeAddress: string;
};
export type PromotionRequest = {
  newPosition: Designation;
};
export type RetirementRequest = {
  retirementDate: string;
};

export type Request = {
  requestType: RequestType;
  requestData: TransferRequest | PromotionRequest | RetirementRequest;
};

export type RequestResponse = {
  id: string;
  status: Verification;
  membershipId: number;
  requestType: RequestType;
  oldPosition: Designation;
  newPosition: Designation;
  oldWorkDistrict: District;
  newWorkDistrict: District;
  retirementDate: Date;
  user: CompleteUser;
  adminComments: string;
  showAgain: boolean;
};
