
import { Avatar, AvatarProps } from "@application/entities/Avatar";


type Override = Partial<AvatarProps>;

export function makeAvatar(override: Override = {}, id?: string): Avatar{
  return new Avatar({
    userId: 'avatar-1',
    file:  'avatar_default.png',
    ...override
  }, id);
}