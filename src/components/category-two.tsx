// @ts-nocheck
import { categoryData } from '../data/data'
import { Link } from 'react-router-dom'
import { IconType } from 'react-icons';

interface CategoryData{
    image: string;
    icon: IconType;
    title: string;
    list: string;
    description?: string;
}

export default function CategoryTwo() {
  return (
        <div className="row align-items-center justify-content-center g-4">
            {categoryData.map((item:CategoryData,index:number)=>{
                const Icon = item.icon
                return(
                    <div className="col-xl-2 col-lg-4 col-md-4 col-sm-6 col-6" key={index}>
                        <div className="category-small-wrapper">
                            <Link to="/contractors/list" className="categoryBox d-block text-center p-4 rounded-3 hover-lift">
                                <div className="categoryCapstions">
                                    <div className="catsIcons mb-3">
                                        <div className="icoBoxx mx-auto d-flex align-items-center justify-content-center" style={{width: '70px', height: '70px', borderRadius: '50%'}}>
                                            <Icon className="fs-2"/>
                                        </div>
                                    </div>
                                    <div className="catsTitle"><h5 className="mb-2 fs-6">{item.title}</h5></div>
                                    <div className="CatsLists"><span className="categorycounter text-muted small">{item.list}</span></div>
                                </div>
                            </Link>
                        </div>
                    </div>
                )
            })}
        </div>
  )
}
