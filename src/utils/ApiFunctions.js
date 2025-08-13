import axios from "axios";

export const api = axios.create({ baseURL: "http://localhost:5161" });

export const getHeader = () => {
  const token = localStorage.getItem("token");
  return {
    Authorization: `Bearer ${token}`,
    //"Content-Type": "application/json",
  };
};

export async function registerUser(registration) {
  try {
    const response = await api.post("/api/auth/register", registration);
    return response.data;
  } catch (error) {
    if (error.reeponse && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`User registration error : ${error.message}`);
    }
  }
}

export async function loginUser(login) {
  try {
    const response = await api.post("/api/Auth/login", login);
    if (response.status >= 200 && response.status < 300) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getAllBooks() {
  try {
    const result = await api.get("/api/Book", {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error("Error fetching books.");
  }
}

export async function getAllGenres() {
  try {
    const result = await api.get("/api/Genre", {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error("Error fetching genres.");
  }
}

export async function getAllAuthors() {
  try {
    const result = await api.get("/api/Author", {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error("Error fetching genres.");
  }
}

export async function getBookById(bookId) {
  try {
    const result = await api.get(`/api/Book/${bookId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching room ${error.message}`);
  }
}

export async function getLoanByLoanId(loanId) {
  try {
    const result = await api.get(`/api/Loan/${loanId}`, {
      headers: getHeader(),
    });
    console.log("result", result);
    return result.data;
  } catch (error) {
    console.log("error", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error find loan : ${error.message}`);
    }
  }
}

export async function getLoanByUser() {
  try {
    const result = await api.get("/api/Loan", {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error find loan : ${error.message}`);
    }
  }
}

export async function deleteBook(bookId) {
  try {
    const result = await api.delete(`/api/Book/${bookId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting book ${error.message}`);
  }
}

export async function addBook(title, isbn, authorId, genreIds) {
  const bookData = {
    title: title,
    isbn: isbn,
    authorId: authorId,
    genreIds: genreIds.map((id) => parseInt(id, 10)),
  };

  try {
    const response = await api.post("/api/Book", bookData, {
      headers: getHeader(),
    });

    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error(error.response.data.message || error.message);
  }
}

export async function updateBook(bookId, bookData) {
  const updatedBookData = {
    title: bookData.title,
    isbn: bookData.isbn,
    authorId: parseInt(bookData.authorId, 10),
    genreIds: bookData.genreIds.map((id) => parseInt(id, 10)),
  };

  try {
    const response = await api.put(`/api/Book/${bookId}`, updatedBookData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    console.error("Error updating book:", error);
    throw new Error(error.response.data.message || error.message);
  }
}

export async function addAuthor(name, biography) {
  const authorData = {
    name: name,
    biography: biography,
  };

  try {
    const response = await api.post("/api/Author", authorData, {
      headers: getHeader(),
    });

    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error creating book:", error);
    throw new Error(error.response.data.message || error.message);
  }
}

export async function getAuthorById(authorId) {
  try {
    const result = await api.get(`/api/Author/${authorId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching author ${error.message}`);
  }
}

export async function updateAuthor(authorId, authorData) {
  try {
    const response = await api.put(`/api/Author/${authorId}`, authorData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    console.error("Error updating author:", error);
    throw new Error(error.response.data.message || error.message);
  }
}

export async function deleteAuthor(authorId) {
  try {
    const result = await api.delete(`/api/Author/${authorId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting author ${error.message}`);
  }
}

export async function addGenre(name, description) {
  const genreData = {
    name: name,
    description: description,
  };

  try {
    const response = await api.post("/api/Genre", genreData, {
      headers: getHeader(),
    });

    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error creating genre:", error);
    throw new Error(error.response.data.message || error.message);
  }
}

export async function getGenreById(genreId) {
  try {
    const result = await api.get(`/api/Genre/${genreId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error fetching genre ${error.message}`);
  }
}

export async function updateGenre(genreId, genreData) {
  try {
    const response = await api.put(`/api/Genre/${genreId}`, genreData, {
      headers: getHeader(),
    });
    return response;
  } catch (error) {
    console.error("Error updating genre:", error);
    throw new Error(error.response.data.message || error.message);
  }
}

export async function deleteGenre(genreId) {
  try {
    const result = await api.delete(`/api/Genre/${genreId}`, {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    throw new Error(`Error deleting genre ${error.message}`);
  }
}

export async function getAllLoansForAdmin() {
  try {
    const result = await api.get("/api/Loan/all", {
      headers: getHeader(),
    });
    return result.data;
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error(`Error fetching all loans : ${error.message}`);
    }
  }
}

export async function createLoan(bookId, dueDate, borrowerId) {
  const loanData = {
    bookId: bookId,
    dueDate: dueDate,
    borrowerId: borrowerId,
  };

  try {
    const response = await api.post("/api/Loan", loanData, {
      headers: getHeader(),
    });

    if (response.status === 201) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error creating loan:", error);
    throw new Error(error.response.data.message || error.message);
  }
}

export async function returnBook(loanId) {
  try {
    const response = await api.post(
      `/api/Loan/return/${loanId}`,
      {},
      {
        headers: getHeader(),
      }
    );

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error returning book:", error);
    throw new Error(error.response.data || error.message);
  }
}

export async function updateLoan(loanId, loanData) {
  const updatedLoanData = {
    dueDate: loanData.dueDate,
    returnDate: loanData.returnDate,
  };

  try {
    const response = await api.put(`/api/Loan/${loanId}`, updatedLoanData, {
      headers: getHeader(),
    });

    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error updating loan:", error);
    if (error.response && error.response.data) {
      throw new Error(error.response.data.message || error.message);
    } else {
      throw new Error(`Error updating loan: ${error.message}`);
    }
  }
}
