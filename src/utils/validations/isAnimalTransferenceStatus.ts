import { AnimalTransferenceStatus } from "@prisma/client";

export const isAnimalTransferenceStatus = (str: string): str is AnimalTransferenceStatus => {
    return ['APPROVED', 'CANCELED', 'REFUSED', 'WAITING_APPROVAL'].includes(str);
}