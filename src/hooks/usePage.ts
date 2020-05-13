import React from 'react';
const { useState } = React;

interface PageProps {
    pageNum: number;
    pageSize: number;
    total: number;
    loading?: boolean;
}
interface SetPageProps {
    pageNum?: number;
    pageSize?: number;
    total?: number;
    loading?: boolean;
}
/**
 * 分页时使用，给Pagination组件赋值
 * 请求接口前setPage({loading: true})
 * 请求成功后setPage({loading: false})
 * @param props 
 */
const usePage = (props: PageProps) => {
    const { pageNum, pageSize, total, loading = false } = props;
    const [page, setPage] = useState({
        pageNum, pageSize, total, loading
    });

    const setPage1 = (setProps: SetPageProps) => {
        const { pageNum, pageSize, total, loading } = setProps;
        setPage({
            pageNum: (pageNum != undefined) ? pageNum : page.pageNum,
            pageSize: (pageSize != undefined) ? pageSize : page.pageSize,
            total: (total != undefined) ? total : page.total,
            loading: (loading != undefined) ? loading : page.loading
        });
    }

    return [page, setPage1, setPage] as [PageProps, (arg: SetPageProps) => void, React.Dispatch<React.SetStateAction<PageProps>>];
};

export default usePage;