import { VerificationCode } from './verificationCode.model';
import { Token } from './token.model';

export const VerificationCodeProviders = [
    {
        provide: 'VERIFICATIONCODE_REPOSITORY',
        useValue: VerificationCode,
    },
];

export const TokenProviders = [
    {
      provide: 'TOKEN_REPOSITORY',
      useValue: Token,
    },
];