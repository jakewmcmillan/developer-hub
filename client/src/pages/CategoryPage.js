import React from 'react';

import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import SnippetList from "../components/SnippetList"

import { QUERY_SINGLE_CATEGORY} from '../utils/queries';

const CategoryPage = () => {
    const { categoryId } = useParams();

    console.log(categoryId);

    const { loading, data, error } = useQuery(QUERY_SINGLE_CATEGORY, {
        variables: { categoryId: categoryId}
    });

    const category = data?.category || {};

    if (loading) {
        return <div>Loading...</div>
    }
    if (error) {
        console.log(error)
    }
    return (
        <div>
            <div className="flex-row justify-center mb-3">
                <h2 className="col-12 col-md-10 p-3 mb-5">
                    {category.CategoryName} Snippets.
                </h2>

                <div className="col-12 col-md-10 mb-5">
                    <SnippetList
                        snippets={category.snippets}
                        title={`${category} snippets:`}
                        showtitle={false}
                        showUsername={false}
                    />
                </div>
            </div>
        </div>
    );
}

export default CategoryPage;