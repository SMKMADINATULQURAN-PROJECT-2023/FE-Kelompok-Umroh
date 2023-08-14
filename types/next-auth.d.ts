import { Session } from "next-auth";





declare module "next-auth" {
  interface Session {
    user: {
      id: number | undefined | null;
      email: string | undefined | null;
      name: string | undefined | null;
      accessToken: any;
      refreshToken: any;

      // Add any other properties from your user object
    };

    // Add any other properties to extend the existing Session type
  }
}
