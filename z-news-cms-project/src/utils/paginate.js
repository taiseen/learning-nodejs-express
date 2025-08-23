const paginate = async (model, query = {}, reqQuery = {}, options = {}) => {

    const { page = 1, limit = 3, sort = '-createdAt' } = reqQuery

    const paginationOptions = {
        page: parseInt(page),
        limit: parseInt(limit),
        sort,
        ...options
    }

    try {

        const result = await model.paginate(query, paginationOptions)

        return {
            data: result.docs,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            currentPage: result.page,
            hasNextPage: result.hasNextPage,
            hasPrevPage: result.hasPrevPage,
            counter: result.pagingCounter,
            totalPages: result.totalPages,
            totalDocs: result.totalDocs,
            limit: result.limit,
        }

    } catch (error) {
        console.log('Pagination Error', error.message)
    }
}


export default paginate;