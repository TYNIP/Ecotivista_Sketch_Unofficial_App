import UserArticles from "@/components/articles/user";
import { useAuth } from "../../api/context/AuthContext";
import styles from '../../../styles/index.module.scss';

export default function Publisher(){
    const { id } = useAuth();
    return (
        <section className={styles.generalContainer}>
            <section className={styles.mainContent}>
                <h2>Mis Articulos</h2>
            </section>
            
            <UserArticles id={id}/>
        </section>
    );
};
