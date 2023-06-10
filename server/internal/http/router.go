package http

import (
	"net/http"

	"github.com/gorilla/mux"
)

func newRouter(h Handler) *mux.Router {
	router := mux.NewRouter()

	router.Use(corsMiddleware(router))

	router.HandleFunc("/recipes", h.Recipes).Methods(http.MethodGet)
	router.HandleFunc("/recipes", h.AddRecipe).Methods(http.MethodPost)
	router.HandleFunc("/recipes/{id}", h.Recipe).Methods(http.MethodGet)
	router.HandleFunc("/recipes/{id}", h.UpdateRecipe).Methods(http.MethodPut)
	router.HandleFunc("/recipes/{id}", h.DeleteRecipe).Methods(http.MethodDelete)

	router.HandleFunc("/units", h.Units).Methods(http.MethodGet)

	return router
}

func corsMiddleware(r *mux.Router) mux.MiddlewareFunc {
	return func(next http.Handler) http.Handler {
		return mux.CORSMethodMiddleware(r)(http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
			w.Header().Set("Access-Control-Allow-Headers", "*")
			w.Header().Set("Access-Control-Allow-Origin", "*")

			if r.Method == http.MethodOptions {
				return
			}

			next.ServeHTTP(w, r)
		}))
	}
}
