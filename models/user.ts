export interface User {
  id: number,
  name: String,
  image_src: String,
  type: UserType,
  email: String,
  password: String
}

enum UserType {
  PROTECTOR = "PROTECTOR"
}