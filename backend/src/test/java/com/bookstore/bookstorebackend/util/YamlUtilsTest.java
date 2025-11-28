package com.bookstore.bookstorebackend.util;

import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

class YamlUtilsTest {

    @Test
    void parseAndSerialize() throws Exception {
        String yaml = """
        id: test
        name: Example
        nested:
          value: 123
        list:
          - a
          - b
        """;

        Map<String, Object> map = YamlUtils.parseToMap(yaml);
        assertEquals("test", map.get("id"));
        assertTrue(map.containsKey("nested"));

        String roundtrip = YamlUtils.toYaml(map);
        assertNotNull(roundtrip);
        System.out.println("YAML roundtrip output:\n" + roundtrip);
        assertTrue(roundtrip.contains("id:"));
        assertTrue(roundtrip.contains("test"));
    }
}
