import { atom } from 'recoil'
import { recoilPersist } from 'recoil-persist';


const { persistAtom } = recoilPersist({
  key: 'currentUser',
});

export const currentUserAtom = atom({
  key: 'currentUser',
  default: null,
  effects_UNSTABLE: [persistAtom]
})