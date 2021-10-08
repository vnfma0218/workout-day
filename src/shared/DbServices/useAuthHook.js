import { useState } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../context/auth-context';
import { dbService } from '../../firebase';

export default function useAuthHook() {
  const [modalOpen, setModalOpen] = useState(false);
  const [error, setError] = useState(null);
  const { signup, login } = useAuth();
  const history = useHistory();
  const closeModalHandler = () => {
    setModalOpen(false);
  };

  const signupHandler = async (
    email,
    password,
    passwordConfirm,
    nickname,
    isWorkoutMode
  ) => {
    //회원가입
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다');
      setModalOpen(true);
      return;
    }

    const result = await dbService.doc(`/users/${email}`).get();
    if (result.exists) {
      setError('이미 사용중인 이메일입니다');
      setModalOpen(true);
      return;
    }

    const isDupleNickname = await dbService
      .collection('users')
      .where('nickname', '==', nickname)
      .get();

    if (!isDupleNickname.empty) {
      setError('이미 사용중인 닉네임입니다.');
      setModalOpen(true);
      return;
    }

    const data = await signup(email, password);
    const userId = data.user.uid;
    const newUser = {
      userId,
      email,
      nickname,
      workoutMode: isWorkoutMode,
    };

    await dbService.doc(`/users/${newUser.email}`).set(newUser);
    history.push('/');
  };

  const loginHandler = async (email, password) => {
    //로그인
    try {
      setError('');
      await login(email, password);
    } catch (error) {
      setError('존재하지 않는 아이디이거나 비밀번호가 틀립니다');
      setModalOpen(true);
      return;
    }
    history.push('/');
  };

  return { modalOpen, error, signupHandler, closeModalHandler, loginHandler };
}
