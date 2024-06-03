export interface MaterialInput {
    name: string;
    quantity: number;
  }
  
  export interface RecipeInput {
    name: string;
    materials: MaterialInput[];
  }