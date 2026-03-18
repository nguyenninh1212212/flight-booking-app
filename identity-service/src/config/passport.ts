import passport from "passport";
import { Strategy as GoogleStrategy, Profile } from "passport-google-oauth20";
import userRepo from "../repo/userRepo";
import roleService from "../services/roleService";
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (
      accessToken: string,
      refreshToken: string,
      profile: Profile,
      done,
    ) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("No email from Google"), undefined);
        }

        let [user, role] = await Promise.all([
          userRepo.findByEmail(email),
          roleService.getDefaultRole(),
        ]);
        if (!user) {
          user = await userRepo.create({ email, password: null }, role.id);
        }
        return done(null, user);
      } catch (err) {
        return done(err as Error, undefined);
      }
    },
  ),
);
