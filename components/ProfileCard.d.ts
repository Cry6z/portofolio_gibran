declare module "@/components/ProfileCard" {
  import type { FC } from "react";

  export interface ProfileCardProps {
    avatarUrl?: string;
    iconUrl?: string;
    grainUrl?: string;
    innerGradient?: string;
    behindGlowEnabled?: boolean;
    behindGlowColor?: string;
    behindGlowSize?: string;
    className?: string;
    disableGlow?: boolean;
    enableTilt?: boolean;
    enableMobileTilt?: boolean;
    mobileTiltSensitivity?: number;
    miniAvatarUrl?: string;
    name?: string;
    title?: string;
    handle?: string;
    status?: string;
    contactText?: string;
    showUserInfo?: boolean;
    showDetails?: boolean;
    contactHref?: string;
    onContactClick?: () => void;
  }

  const ProfileCard: FC<ProfileCardProps>;
  export default ProfileCard;
}
