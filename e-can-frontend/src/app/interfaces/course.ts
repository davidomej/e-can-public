export interface Course {
    id: string;
    name: string;
    description: string;
    duration: number;
    modality: string;
    category: string;
    price: number;
    image: string;
    deleted: boolean;
    subsidised: boolean;
    certification: string;
    imageUrl?: string;
    showDetails?: boolean;
}
