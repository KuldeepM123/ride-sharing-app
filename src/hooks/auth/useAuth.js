import {useMutation} from '@tanstack/react-query';
import {sendOtp_service} from '../../api/auth';

export const useSendOtp = () => {
  return useMutation({
    mutationFn: sendOtp_service,
  });
};
export const useVerifyOtp = () => {
  return useMutation({
    mutationFn: verifyOtp_service,
  });
};
export const useSignup = () => {
  return useMutation({
    mutationFn: signup_service,
  });
};
