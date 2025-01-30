export const uploadImage = async (formData: FormData) => {
  const res = await fetch('/api/image', {
    method: 'POST',
    body: formData,
  });

  const data = await res.json();
  if (res.ok) {
    return data;
  }
  throw new Error('Image does not Uploaded Properly');
};

export const getImagesByProductId = async (productId: string) => {
  const res = await fetch(`/api/image?productId=${productId}`, {
    // cache: 'force-cache',
  });
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  throw new Error('Image does not fetched Properly');
};

export const deleteImage = async (imageId: string) => {
  const res = await fetch(`/api/image?imageId=${imageId}`, {
    method: 'DELETE',
  });

  const data = await res.json();
  if (res.ok) {
    return data;
  }
  throw new Error('Image does not deleted Properly');
};
