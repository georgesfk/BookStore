package com.bookstore.bookstorebackend.util;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.dataformat.yaml.YAMLFactory;

import java.io.IOException;
import java.util.Map;

public final class YamlUtils {
    private static final ObjectMapper YAML_MAPPER = new ObjectMapper(new YAMLFactory());
    private static final ObjectMapper JSON_MAPPER = new ObjectMapper();

    private YamlUtils() {
    }

    public static <T> T fromYaml(String yaml, Class<T> clazz) throws IOException {
        return YAML_MAPPER.readValue(yaml, clazz);
    }

    @SuppressWarnings("unchecked")
    public static Map<String, Object> parseToMap(String yaml) throws IOException {
        return YAML_MAPPER.readValue(yaml, Map.class);
    }

    public static String toYaml(Object obj) throws JsonProcessingException {
        return YAML_MAPPER.writeValueAsString(obj);
    }

    public static String toJson(Object obj) throws JsonProcessingException {
        return JSON_MAPPER.writeValueAsString(obj);
    }
}
