import { makeAvatar } from "@test/factories/avatarFactory";
import { inMemoryAvatarRepository } from "@test/repositories/inMemoryAvatarRepository";
import { DeleteAvatarUserService } from "./DeleteAvatarUserService";

describe('Delete Avatar User', () => {

  it('should be possible delete an avatar by userId', async () => {

    const avatarRepository = new inMemoryAvatarRepository();

    avatarRepository.create(makeAvatar({
      userId: 'user-1'
    }));
    avatarRepository.create(makeAvatar({
      userId: 'user-2'
    }));
    avatarRepository.create(makeAvatar({
      userId: 'user-3'
    }));

    avatarRepository.deleteByUserId('user-2');
  
    expect(await avatarRepository.findAvatarByUserId('user-2')).toBeFalsy();

  });

});