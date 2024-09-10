export const getAllCategories = async () => {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + '/category');

    return response.json();
}
