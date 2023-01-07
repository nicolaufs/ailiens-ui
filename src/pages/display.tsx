import type { NextPage } from "next"
import Head from "next/head"
import styles from "../styles/Home.module.css"
import { HomeView } from "../views"
import DisplayView from "../views/display"

const Display: NextPage = () => {
  return (
    <DisplayView />
  )
}

export default Display