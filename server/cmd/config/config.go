package config

import "github.com/jinzhu/configor"

type Config struct {
	HttpServer struct {
		Address string `env:"HTTP_SERVER_ADDRESS" default:"0.0.0.0:8080"`
	}
	Storage struct {
		Path string `env:"STORAGE_PATH"`
	}
}

func Load() (*Config, error) {
	var c Config

	if err := configor.Load(&c); err != nil {
		return nil, err
	}

	return &c, nil
}
