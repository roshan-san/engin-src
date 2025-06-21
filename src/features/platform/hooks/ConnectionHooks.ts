import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";

export const useCreateConnection = () => {
    return useMutation(api.connections.mutations.createConnection);
}

export const useAcceptConnection = () => {
    return useMutation(api.connections.mutations.acceptConnection);
}

export const useRejectConnection = () => {
    return useMutation(api.connections.mutations.rejectConnection);
} 